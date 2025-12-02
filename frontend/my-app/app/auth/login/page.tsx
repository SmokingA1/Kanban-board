import ParticlesBackground from '@/components/shared/ParticlesBackground';
import LoginForm from '@/components/auth/LoginForm';

export default function LoginPage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <ParticlesBackground 
        color="rgba(88,129,87,0.9)"
        gradient="linear-gradient(135deg, #344E41 0%, #2d3a2e 25%, #3A5A40 50%, #2d4a35 75%, #344E41 100%)"
      />
      
      <div className="relative flex items-center justify-center min-h-screen p-4" style={{ zIndex: 10 }}>
        <LoginForm />
      </div>
    </div>
  );
}