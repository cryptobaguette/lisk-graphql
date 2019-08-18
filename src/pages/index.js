import React from 'react';
import classnames from 'classnames';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import withBaseUrl from '@docusaurus/withBaseUrl';
import styles from './styles.module.css';

const features = [
  {
    title: <>Query the Lisk data via GraphQL</>,
    description: (
      <>
        Query the blocks, transactions, accounts etc.. in <b>realtime</b> with
        subscriptions using a fast and scalable GraphQL server.
      </>
    ),
  },
  {
    title: <>The power of Hasura GraphQL</>,
    description: (
      <>
        Using Hasura allow us to benefit for all the great features it provide
        such as, Realtime with subscriptions & live-queries, Event-triggers on
        database events etc..
      </>
    ),
  },
  {
    title: <>Easily extendable</>,
    description: (
      <>
        Lisk-GraphQL is just the base schema of your graphQL api. You can extend
        it easily with your own logic and requirements.
      </>
    ),
  },
];

function Home() {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="A Graphql api on top of the Lisk blockchain"
    >
      <header className={classnames('hero', styles.heroBanner)}>
        <div className="container">
          <img className={classnames(styles.heroImage)} src="/img/banner.png" />
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <div className={styles.buttons}>
            <Link
              className={classnames(
                'button button--outline button--secondary button--lg',
                styles.getStarted
              )}
              to={withBaseUrl('docs/introduction')}
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>
      <main>
        {features && features.length && (
          <section className={styles.features}>
            <div className="container">
              <div className="row">
                {features.map(({ imageUrl, title, description }, idx) => (
                  <div
                    key={idx}
                    className={classnames('col col--4', styles.feature)}
                  >
                    {imageUrl && (
                      <div className="text--center">
                        <img
                          className={styles.featureImage}
                          src={withBaseUrl(imageUrl)}
                          alt={title}
                        />
                      </div>
                    )}
                    <h3>{title}</h3>
                    <p>{description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </Layout>
  );
}

export default Home;
