import { useTranslation } from 'next-i18next'

function About() {
  const { t } = useTranslation();
  return <div>{t('hello')}, {t('world')}!</div>;
}

export default About