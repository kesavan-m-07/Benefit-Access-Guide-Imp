import { Button, Container } from "@shared/components";

const WelcomeBack = () => {
  return (
    <Container className="h-full w-full lg:w-full lg:max-w-full flex-1 p-8 rounded-2xl border border-slate-200/50 bg-white/75 backdrop-blur-md flex flex-col items-center mt-3 text-center shadow-md pb-12">
      <h1 className="text-2xl font-bold font-fira text-slate-900 mt-8 tracking-wide max-w-md">
        Welcome back! Are you feeling lucky today?
      </h1>
      <Button variant="secondary" type="button" className="mb-2 mt-20 mx-5">
        Yes
      </Button>
      <Button variant="secondary" type="button">No</Button>
    </Container>
  );
};

export default WelcomeBack;
