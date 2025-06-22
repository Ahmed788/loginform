type WelcomeProps = { name: string };

export default function Welcome({ name }: WelcomeProps) {
  return <div className="text-lg">مرحباً {name} 👋</div>;
}