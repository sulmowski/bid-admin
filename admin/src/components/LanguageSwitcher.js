import { useRouter } from 'next/router';

function LanguageSwitcher() {
  const router = useRouter();
  return (
    <div>
      <button onClick={() => router.push('/', '/', { locale: 'en' })}>English</button>
      <button onClick={() => router.push('/', '/', { locale: 'pl' })}>Polski</button>
    </div>
  );
}