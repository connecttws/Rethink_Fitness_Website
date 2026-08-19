import styles from './LocationSection.module.css';

export default function LocationSection() {
  return (
    <section id="location" className={styles.locationSection}>
      <div className={`container`}>
        <div className={styles.header}>
          <h2 className={styles.sectionTitle}>
            Find <span className="text-accent">Us</span>
          </h2>
          <p className={styles.sectionDesc}>
            Come visit our world-class facility and see why we are the city's premier fitness destination.
          </p>
        </div>

        <div className={styles.grid}>
          <div className={styles.infoCard}>
            <div className={styles.infoGroup}>
              <h3 className={styles.infoTitle}>Address</h3>
              <p className={styles.infoText}>
                123 Fitness Ave<br />
                Iron District, NY 10001
              </p>
            </div>

            <div className={styles.infoGroup}>
              <h3 className={styles.infoTitle}>Hours of Operation</h3>
              <p className={styles.infoText}>
                Monday - Friday: 5:00 AM - 11:00 PM<br />
                Saturday - Sunday: 7:00 AM - 9:00 PM
              </p>
            </div>

            <div className={styles.infoGroup}>
              <h3 className={styles.infoTitle}>Contact</h3>
              <p className={styles.infoText}>
                Phone: (555) 123-4567<br />
                Email: info@rethinkfit.com
              </p>
            </div>
            
            <button className="btn btn-outline" style={{marginTop: '1rem', width: '100%'}}>
              Get Directions
            </button>
          </div>

          <div className={styles.mapContainer}>
            {/* Embedded Google Map iframe - using a placeholder location for the design */}
            <iframe 
              className={styles.mapIframe}
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.25279989053!2d-74.11976228302061!3d40.697663749454844!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY!5e0!3m2!1sen!2sus!4v1705607386221!5m2!1sen!2sus" 
              allowFullScreen={false} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade">
            </iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
