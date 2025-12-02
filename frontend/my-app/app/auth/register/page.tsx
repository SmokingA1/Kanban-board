import ParticlesBackground from '@/components/shared/ParticlesBackground';
import RegistrationForm from '@/components/auth/RegistrationForm';

export default function RegisterPage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <ParticlesBackground 
        color="rgba(163,184,138,0.9)"
        gradient="radial-gradient(circle at top right, #A3B18A 0%, #588157 30%, #3A5A40 60%, #344E41 100%)"
      />
      
      <div className="relative flex items-center justify-center min-h-screen p-4" style={{ zIndex: 10 }}>
        <RegistrationForm />
      </div>
    </div>
  );
}