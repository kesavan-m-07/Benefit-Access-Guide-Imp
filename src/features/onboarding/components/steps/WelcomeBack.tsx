import { Button, Container } from "@shared/components";

const WelcomeBack = () => {
  return (
    <Container className="p-card rounded-xl backdrop-blur-lg flex flex-col bg-white items-center mt-compact text-center h-135 px-5 lg:px-40">
      <h1 className="text-2xl font-medium font-helvetica mt-10 ">
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
