import styles from './InstagramFeed.module.css';

const posts = [
  { id: 1, image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070&auto=format&fit=crop' },
  { id: 2, image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2070&auto=format&fit=crop' },
  { id: 3, image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop' },
  { id: 4, image: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=2069&auto=format&fit=crop' },
  { id: 5, image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=2070&auto=format&fit=crop' },
  { id: 6, image: 'https://images.unsplash.com/photo-1554284126-aa88f2244b40?q=80&w=2070&auto=format&fit=crop' },
  { id: 7, image: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?q=80&w=2069&auto=format&fit=crop' },
  { id: 8, image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=2070&auto=format&fit=crop' },
];

export default function InstagramFeed() {
  return (
    <section className={styles.instaSection}>
      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.sectionTitle}>
            Join the <span className="text-accent">Community</span>
          </h2>
          <p className={styles.sectionDesc}>
            Tag us in your workouts @RethinkFitness
          </p>
        </div>

        <div className={styles.feedGrid}>
          {posts.map((post) => (
            <div key={post.id} className={styles.post}>
              <img src={post.image} alt={`Instagram post ${post.id}`} />
              <div className={styles.overlay}>
                <svg className={styles.icon} width="32" height="32" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.followWrapper}>
          <a href="#" className="btn btn-outline">Follow Us on Instagram</a>
        </div>
      </div>
    </section>
  );
}
