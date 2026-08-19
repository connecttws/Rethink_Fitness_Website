import styles from './BlogPage.module.css';

const featuredPost = {
  id: 'feat-1',
  category: 'Training',
  title: '5 Myths About Hypertrophy You Need to Stop Believing',
  excerpt: 'Are you still training in the "hypertrophy zone" of 8-12 reps exclusively? Our head coach breaks down the latest sports science research on muscle growth and why you might be leaving gains on the table.',
  image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=2070&auto=format&fit=crop',
  author: 'Marcus Vance',
  authorImg: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=150&auto=format&fit=crop',
  date: 'August 12, 2026',
};

const recentPosts = [
  {
    id: 1,
    category: 'Nutrition',
    title: 'The Ultimate Guide to Pre-Workout Fueling',
    excerpt: 'Stop eating heavy meals 30 minutes before training. Discover the optimal timing and macro ratios to ensure maximum energy without the sluggishness.',
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=2053&auto=format&fit=crop',
    author: 'Sarah Jenkins',
    authorImg: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=150&auto=format&fit=crop',
    date: 'August 08, 2026',
  },
  {
    id: 2,
    category: 'Recovery',
    title: 'Why Sleep is Your Strongest Performance Enhancer',
    excerpt: 'You break muscle down in the gym, but you build it in bed. A deep dive into sleep architecture and how to optimize your circadian rhythm.',
    image: 'https://images.unsplash.com/photo-1511295742362-92c96b124e52?q=80&w=1974&auto=format&fit=crop',
    author: 'David Chen',
    authorImg: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=150&auto=format&fit=crop',
    date: 'August 03, 2026',
  },
  {
    id: 3,
    category: 'Mindset',
    title: 'Overcoming the Mid-Year Motivation Slump',
    excerpt: 'Lost your fire? Learn the psychological frameworks used by elite athletes to maintain discipline when motivation fades away.',
    image: 'https://images.unsplash.com/photo-1526506114621-0027f6111fb4?q=80&w=2070&auto=format&fit=crop',
    author: 'Marcus Vance',
    authorImg: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=150&auto=format&fit=crop',
    date: 'July 28, 2026',
  },
  {
    id: 4,
    category: 'Training',
    title: 'Mastering the Barbell Back Squat',
    excerpt: 'A comprehensive biomechanical breakdown of the king of all exercises. Fix your hip shift, improve ankle mobility, and squat deeper.',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop',
    author: 'Marcus Vance',
    authorImg: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=150&auto=format&fit=crop',
    date: 'July 22, 2026',
  },
  {
    id: 5,
    category: 'Nutrition',
    title: 'Supplements: What Works and What is Waste',
    excerpt: 'Cutting through the marketing hype. We analyze the handful of supplements actually backed by clinical peer-reviewed data.',
    image: 'https://images.unsplash.com/photo-1579722820308-d74e571900a9?q=80&w=2070&auto=format&fit=crop',
    author: 'Sarah Jenkins',
    authorImg: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=150&auto=format&fit=crop',
    date: 'July 15, 2026',
  },
  {
    id: 6,
    category: 'Recovery',
    title: 'Ice Baths vs Saunas: The Ultimate Showdown',
    excerpt: 'Contrasting the physiological responses of extreme cold exposure versus heat therapy, and when to utilize each modality.',
    image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=2070&auto=format&fit=crop',
    author: 'David Chen',
    authorImg: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=150&auto=format&fit=crop',
    date: 'July 09, 2026',
  }
];

export default function BlogPage() {
  return (
    <main className={styles.pageContainer}>
      <section className={styles.hero}>
        <div className="container">
          <h1 className={styles.heroTitle}>
            The Rethink <span className="text-accent">Journal</span>
          </h1>
          <p className={styles.heroDesc}>
            Expert insights, training tips, nutritional deep-dives, and everything you need to know about crushing your goals.
          </p>
        </div>
      </section>

      <section className={styles.featuredSection}>
        <div className="container">
          <a href="#" className={styles.featuredCard}>
            <div className={styles.featuredImageContainer}>
              <img src={featuredPost.image} alt={featuredPost.title} className={styles.featuredImage} />
            </div>
            <div className={styles.featuredContent}>
              <span className={styles.categoryTag}>{featuredPost.category}</span>
              <h2 className={styles.featuredTitle}>{featuredPost.title}</h2>
              <p className={styles.featuredExcerpt}>{featuredPost.excerpt}</p>
              
              <div className={styles.articleMeta}>
                <img src={featuredPost.authorImg} alt={featuredPost.author} className={styles.authorImg} />
                <div>
                  <div className={styles.authorName}>{featuredPost.author}</div>
                  <div className={styles.publishDate}>{featuredPost.date}</div>
                </div>
              </div>
            </div>
          </a>
        </div>
      </section>

      <section className={styles.recentSection}>
        <div className="container">
          <h3 className={styles.sectionTitle}>Latest <span className="text-accent">Articles</span></h3>
          <div className={styles.grid}>
            {recentPosts.map((post) => (
              <a href="#" key={post.id} className={styles.card}>
                <div className={styles.imageContainer}>
                  <img src={post.image} alt={post.title} className={styles.image} />
                </div>
                <div className={styles.content}>
                  <span className={styles.categoryTag}>{post.category}</span>
                  <h4 className={styles.title}>{post.title}</h4>
                  <p className={styles.excerpt}>{post.excerpt}</p>
                  
                  <div className={styles.articleMeta}>
                    <img src={post.authorImg} alt={post.author} className={styles.authorImg} />
                    <div>
                      <div className={styles.authorName}>{post.author}</div>
                      <div className={styles.publishDate}>{post.date}</div>
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
            <h2 className={styles.newsletterTitle}>Never Miss An <span className="text-accent">Update</span></h2>
            <p className={styles.newsletterDesc}>
              Join 5,000+ athletes who receive our weekly newsletter containing actionable training advice and nutritional insights.
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
  );
}
