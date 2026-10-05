/**
 * BooClient CRM — Universal Smart Form & UTM Capture Tracker
 * Auto-discovers any form, extracts dynamic questionnaire fields, and attaches UTMs.
 * Version: 1.0.0
 */
(function () {
  'use strict';

  // 1. Identify configuration from script tag
  const scriptTag = document.currentScript || document.querySelector('script[data-crm-key]');
  if (!scriptTag) return;

  const landingPageKey = scriptTag.getAttribute('data-crm-key');
  let apiUrl = scriptTag.getAttribute('data-api-url');

  if (!apiUrl) {
    try {
      const srcUrl = new URL(scriptTag.src);
      apiUrl = `${srcUrl.origin}/api/public/leads`;
    } catch (e) {
      apiUrl = '/api/public/leads';
    }
  }

  if (!landingPageKey) {
    console.warn('[BooClient Tracker] Missing data-crm-key attribute.');
    return;
  }

  // 2. Helper: Convert camelCase or snake_case to Clean Label
  function cleanFieldName(str) {
    if (!str) return 'Field';
    return str
      .replace(/[-_]/g, ' ')
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      .replace(/\b\w/g, function (c) { return c.toUpperCase(); })
      .trim();
  }

  // 3. Helper: Extract Human-Readable Label from Form Element
  function getElementLabel(el) {
    if (el.id) {
      const label = document.querySelector(`label[for="${CSS.escape(el.id)}"]`);
      if (label && label.innerText.trim()) {
        return label.innerText.replace(/[*:]/g, '').replace(/\(Optional\)/i, '').trim();
      }
    }
    const parentLabel = el.closest('label');
    if (parentLabel && parentLabel.innerText.trim()) {
      return parentLabel.innerText.replace(/[*:]/g, '').replace(/\(Optional\)/i, '').trim();
    }
    if (el.placeholder && el.placeholder.trim()) {
      return el.placeholder.replace(/[*:]/g, '').trim();
    }
    return cleanFieldName(el.name || el.id);
  }

  // 4. Capture Ad UTMs & Platform
  function getAdAttribution() {
    const params = new URLSearchParams(window.location.search);
    const utmSource = params.get('utm_source');
    const gclid = params.get('gclid');
    const fbclid = params.get('fbclid');

    let source = utmSource;
    if (!source) {
      const ref = (document.referrer || '').toLowerCase();
      if (fbclid || ref.includes('facebook') || ref.includes('instagram')) {
        source = 'Meta Ads';
      } else if (gclid || ref.includes('google')) {
        source = 'Google Ads';
      } else if (ref.includes('youtube')) {
        source = 'YouTube';
      } else if (ref.includes('linkedin')) {
        source = 'LinkedIn';
      } else {
        source = ref ? 'Referral' : 'Website Direct';
      }
    } else {
      const s = source.toLowerCase();
      if (s === 'meta' || s === 'facebook' || s === 'ig' || s === 'instagram') source = 'Meta Ads';
      else if (s === 'google' || s === 'adwords') source = 'Google Ads';
    }

    const utmData = {
      source: source,
      medium: params.get('utm_medium') || (gclid || fbclid ? 'cpc' : 'organic'),
      campaign: params.get('utm_campaign') || 'Inbound Campaign',
      content: params.get('utm_content') || '',
      term: params.get('utm_term') || '',
      landingPageUrl: window.location.href,
    };

    try {
      sessionStorage.setItem('bcl_utm_cache', JSON.stringify(utmData));
    } catch (_) {}

    return utmData;
  }

  const attribution = getAdAttribution();

  // 5. Dynamic Form Harvester: Extracts ALL Form Options Automatically
  function harvestForm(form) {
    const elements = form.querySelectorAll('input, select, textarea');
    let name = '';
    let phone = '';
    let countryCode = '+91';
    let email = '';
    let city = '';

    const questions = [];
    const formDataAnswers = {};
    let order = 1;

    elements.forEach(function (el) {
      const type = (el.type || '').toLowerCase();
      const rawKey = (el.name || el.id || '').toLowerCase().replace(/[^a-z0-9_]/g, '_');
      const val = (el.value || '').trim();

      if (type === 'submit' || type === 'button' || type === 'password' || type === 'hidden') {
        return;
      }

      // Checkbox / Radio handling
      if ((type === 'checkbox' || type === 'radio') && !el.checked) {
        return;
      }

      // Country code dropdown detection
      if (el.tagName === 'SELECT' && (val.startsWith('+') || rawKey.includes('country'))) {
        countryCode = val;
        return;
      }

      // Standard Field 1: Phone
      if (!phone && (type === 'tel' || rawKey.includes('phone') || rawKey.includes('mobile') || rawKey.includes('contact'))) {
        phone = val;
        return;
      }

      // Standard Field 2: Email
      if (!email && (type === 'email' || rawKey.includes('email') || rawKey.includes('mail'))) {
        email = val;
        return;
      }

      // Standard Field 3: Name
      if (!name && (rawKey.includes('name') || rawKey.includes('fullname'))) {
        name = val;
        return;
      }

      // Standard Field 4: City
      if (!city && (rawKey.includes('city') || rawKey.includes('location'))) {
        city = val;
        return;
      }

      // DYNAMIC CLIENT QUESTIONS: (e.g. Age, Current Weight, Condition, Pain Area, Doctor, Treatment, etc.)
      const questionLabel = getElementLabel(el);
      const fieldKey = rawKey || `question_${order}`;

      // Collect select dropdown options if available
      const dropdownOptions = [];
      if (el.tagName === 'SELECT') {
        Array.from(el.options).forEach(function (opt) {
          if (opt.value && !opt.value.startsWith('+')) {
            dropdownOptions.push(opt.text.trim());
          }
        });
      }

      questions.push({
        fieldKey: fieldKey,
        questionText: questionLabel,
        fieldType: el.tagName === 'SELECT' ? 'select' : el.tagName === 'TEXTAREA' ? 'textarea' : type,
        options: dropdownOptions,
        displayOrder: order++,
      });

      if (val) {
        formDataAnswers[fieldKey] = val;
      }
    });

    if (phone && !phone.startsWith('+')) {
      phone = `${countryCode} ${phone}`.trim();
    }

    return {
      name: name || 'Website Prospect',
      phone: phone || undefined,
      email: email || undefined,
      city: city || undefined,
      questions: questions,
      formData: formDataAnswers,
    };
  }

  // 6. Transmit to CRM
  let lastSubmit = 0;
  function submitLead(lead) {
    const now = Date.now();
    if (now - lastSubmit < 2000) return;
    lastSubmit = now;

    if (!lead.phone && !lead.email) return;

    let utm = attribution;
    try {
      const cached = sessionStorage.getItem('bcl_utm_cache');
      if (cached) utm = JSON.parse(cached);
    } catch (_) {}

    // Build human-readable summary of custom questionnaire
    const summaryParts = [];
    Object.keys(lead.formData || {}).forEach(function (k) {
      summaryParts.push(`${k}: ${lead.formData[k]}`);
    });

    const payload = {
      landingPageKey: landingPageKey,
      name: lead.name,
      phone: lead.phone,
      email: lead.email,
      city: lead.city,
      message: summaryParts.length > 0 ? summaryParts.join(' | ') : undefined,
      questions: lead.questions, // Auto-discovery schema payload
      formData: lead.formData,   // The prospect's dynamic answers
      landingPageUrl: window.location.href,
      utm: {
        source: utm.source,
        medium: utm.medium,
        campaign: utm.campaign,
        content: utm.content,
        term: utm.term,
      },
    };

    try {
      fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        keepalive: true,
      }).catch(function (e) {
        console.warn('[BooClient Tracker] Dispatch error:', e);
      });
    } catch (err) {
      console.warn('[BooClient Tracker] Failed to send lead:', err);
    }
  }

  // 7. Event Interception (Runs on capture phase for universal compatibility)
  document.addEventListener(
    'submit',
    function (e) {
      if (e.target && e.target.tagName === 'FORM') {
        submitLead(harvestForm(e.target));
      }
    },
    true
  );

  document.addEventListener(
    'click',
    function (e) {
      const btn = e.target.closest('button[type="submit"], input[type="submit"]');
      if (btn && btn.closest('form')) {
        submitLead(harvestForm(btn.closest('form')));
      }
    },
    true
  );

  console.log('[BooClient Tracker] Active for client token:', landingPageKey);
})();
