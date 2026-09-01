export const revalidate = 60;
import styles from './BlogPage.module.css';
import prisma from "@/lib/prisma";

const featuredPost = {
  id: 'feat-1',
  category: 'Training',
  title: '5 Myths About Hypertrophy You Need to Stop Believing',
  excerpt: 'Are you still training in the "hypertrophy zone" of 8-12 reps exclusively? Our head coach breaks down the latest sports science research on muscle growth and why you might be leaving gains on the table.',
  image: '/Images/Galley/DS9A8021.jpg',
  author: 'Marcus Vance',
  authorImg: '/Images/Galley/DS9A7984.jpg',
  date: 'August 12, 2026',
};

const recentPosts = [
  {
    id: 1,
    category: 'Nutrition',
    title: 'The Ultimate Guide to Pre-Workout Fueling',
    excerpt: 'Stop eating heavy meals 30 minutes before training. Discover the optimal timing and macro ratios to ensure maximum energy without the sluggishness.',
    image: '/Images/Galley/DS9A8024.jpg',
    author: 'Sarah Jenkins',
    authorImg: '/Images/Galley/DS9A7985.jpg',
    date: 'August 08, 2026',
  },
  {
    id: 2,
    category: 'Recovery',
    title: 'Why Sleep is Your Strongest Performance Enhancer',
    excerpt: 'You break muscle down in the gym, but you build it in bed. A deep dive into sleep architecture and how to optimize your circadian rhythm.',
    image: '/Images/Galley/DS9A8025.jpg',
    author: 'David Chen',
    authorImg: '/Images/Galley/DS9A7986.jpg',
    date: 'August 03, 2026',
  },
  {
    id: 3,
    category: 'Mindset',
    title: 'Overcoming the Mid-Year Motivation Slump',
    excerpt: 'Lost your fire? Learn the psychological frameworks used by elite athletes to maintain discipline when motivation fades away.',
    image: '/Images/Galley/DS9A8026.jpg',
    author: 'Marcus Vance',
    authorImg: '/Images/Galley/DS9A7984.jpg',
    date: 'July 28, 2026',
  },
  {
    id: 4,
    category: 'Training',
    title: 'Mastering the Barbell Back Squat',
    excerpt: 'A comprehensive biomechanical breakdown of the king of all exercises. Fix your hip shift, improve ankle mobility, and squat deeper.',
    image: '/Images/Galley/DS9A8028.jpg',
    author: 'Marcus Vance',
    authorImg: '/Images/Galley/DS9A7984.jpg',
    date: 'July 22, 2026',
  },
  {
    id: 5,
    category: 'Nutrition',
    title: 'Supplements: What Works and What is Waste',
    excerpt: 'Cutting through the marketing hype. We analyze the handful of supplements actually backed by clinical peer-reviewed data.',
    image: '/Images/Galley/DS9A8029.jpg',
    author: 'Sarah Jenkins',
    authorImg: '/Images/Galley/DS9A7985.jpg',
    date: 'July 15, 2026',
  },
  {
    id: 6,
    category: 'Recovery',
    title: 'Ice Baths vs Saunas: The Ultimate Showdown',
    excerpt: 'Contrasting the physiological responses of extreme cold exposure versus heat therapy, and when to utilize each modality.',
    image: '/Images/Galley/DS9A8030.jpg',
    author: 'David Chen',
    authorImg: '/Images/Galley/DS9A7986.jpg',
    date: 'July 09, 2026',
  }
];

import { isAdminSession } from "@/lib/auth/session";
import { EditModeProvider } from "@/components/visual-editor/EditModeContext";
import { EditorToolbar } from "@/components/visual-editor/EditorToolbar";
import { EditableText, EditableImage } from "@/components/visual-editor";
import { getCachedPageContent } from "@/lib/visual-data/loadContent";

export default async function BlogPage() {
  const pageData = await getCachedPageContent('/blog');
  const isEditMode = await isAdminSession();
  
  // Provide safe fallbacks so the site doesn't break if the data hasn't been added to CMS yet
  const content = (pageData as any) || {};
  const currentFeaturedPost = content.featuredPost || featuredPost;
  const currentRecentPosts = content.recentPosts || recentPosts;

  return (
    <EditModeProvider isEditMode={isEditMode} visualContent={content} pageSlug="/blog">
      <EditorToolbar />
      <main className={styles.pageContainer}>
        <section className={styles.hero}>
          <div className="container">
            <h1 className={styles.heroTitle}>
              <EditableText path="heroTitlePrefix" fallback="Evidence-Based Fitness" />{" "}
              <EditableText path="heroTitleAccent" fallback="Insights" as="span" className="text-accent" />
            </h1>
            <p className={styles.heroDesc}>
              <EditableText path="heroDesc" fallback="Expert insights, training tips, nutritional deep-dives, and everything you need to know about crushing your goals." />
            </p>
          </div>
        </section>

        <section className={styles.featuredSection}>
          <div className="container">
            <a href="#" className={styles.featuredCard}>
              <div className={styles.featuredImageContainer}>
                 <EditableImage path="featuredPost.image" fallback={currentFeaturedPost.image} alt={currentFeaturedPost.title} imgClassName={styles.featuredImage} />
              </div>
              <div className={styles.featuredContent}>
                <span className={styles.categoryTag}>
                  <EditableText path="featuredPost.category" fallback={currentFeaturedPost.category} />
                </span>
                <h2 className={styles.featuredTitle}>
                  <EditableText path="featuredPost.title" fallback={currentFeaturedPost.title} />
                </h2>
                <EditableText path="featuredPost.excerpt" fallback={currentFeaturedPost.excerpt} as="p" className={styles.featuredExcerpt} multiline />
                
                <div className={styles.articleMeta}>
                  <EditableImage path="featuredPost.authorImg" fallback={currentFeaturedPost.authorImg} alt={currentFeaturedPost.author} imgClassName={styles.authorImg} />
                  <div>
                    <div className={styles.authorName}>
                      <EditableText path="featuredPost.author" fallback={currentFeaturedPost.author} />
                    </div>
                    <div className={styles.publishDate}>
                      <EditableText path="featuredPost.date" fallback={currentFeaturedPost.date} />
                    </div>
                  </div>
                </div>
              </div>
            </a>
          </div>
        </section>

        <section className={styles.recentSection}>
          <div className="container">
            <h3 className={styles.sectionTitle}>
              <EditableText path="latestArticlesPrefix" fallback="Latest" />{" "}
              <EditableText path="latestArticlesAccent" fallback="Articles" as="span" className="text-accent" />
            </h3>
            <div className={styles.grid}>
              {currentRecentPosts.map((post: any, idx: number) => (
                <a href="#" key={post.id || idx} className={styles.card}>
                  <div className={styles.imageContainer}>
                    <EditableImage path={`recentPosts.${idx}.image`} fallback={post.image} alt={post.title} imgClassName={styles.image} />
                  </div>
                  <div className={styles.content}>
                    <span className={styles.categoryTag}>
                      <EditableText path={`recentPosts.${idx}.category`} fallback={post.category} />
                    </span>
                    <h4 className={styles.title}>
                      <EditableText path={`recentPosts.${idx}.title`} fallback={post.title} />
                    </h4>
                    <EditableText path={`recentPosts.${idx}.excerpt`} fallback={post.excerpt} as="p" className={styles.excerpt} multiline />
                    
                    <div className={styles.articleMeta}>
                      <EditableImage path={`recentPosts.${idx}.authorImg`} fallback={post.authorImg} alt={post.author} imgClassName={styles.authorImg} />
                      <div>
                        <div className={styles.authorName}>
                          <EditableText path={`recentPosts.${idx}.author`} fallback={post.author} />
                        </div>
                        <div className={styles.publishDate}>
                          <EditableText path={`recentPosts.${idx}.date`} fallback={post.date} />
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.newsletterSection}>
          <div className="container">
            <div className={styles.newsletterContent}>
              <h2 className={styles.newsletterTitle}>
                <EditableText path="newsletterTitlePrefix" fallback="Never Miss An" />{" "}
                <EditableText path="newsletterTitleAccent" fallback="Update" as="span" className="text-accent" />
              </h2>
              <p className={styles.newsletterDesc}>
                <EditableText path="newsletterDesc" fallback="Join 5,000+ athletes who receive our weekly newsletter containing actionable training advice and nutritional insights." />
              </p>
              <form className={styles.newsletterForm}>
                <input 
                  type="email" 
                  placeholder="Enter your email address" 
                  className={styles.newsletterInput}
                  required
                />
                <button type="button" className="btn">Subscribe Now</button>
              </form>
            </div>
          </div>
        </section>
      </main>
    </EditModeProvider>
  );
}

