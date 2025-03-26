interface WelcomeProps {
  onSignIn: () => void;
}

const Welcome = ({ onSignIn }: WelcomeProps) => {
  return (
    <section className="section-screen">
      <div className="section-card welcome-card">
        <img src="/assets/hug.png" alt="Welcome" width={56} height={56} />
        <div className="welcome-texts">
          <h1 className="welcome-title">Welcome!</h1>
          <p className="welcome-text">
            This is Frontegg’s sample app that will let you experiment with our
            authentication flows.
          </p>
        </div>
        <button className="primary-button" onClick={onSignIn}>
          Sign in
        </button>
      </div>
    </section>
  );
};

export default Welcome;
