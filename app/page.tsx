import Slider from "./components/Slider";
import Featured from "./components/Featured";
import Offer from "./components/Offer";
import { sendMail } from "./utils/mail";

export default async function Home() {
  await sendMail({to: "mari.info695@gmail.com", subject: "test", body:"hello world"});

  return (
    <main>
      <Slider />
      <Featured />
      <Offer />
    </main>
  );
}
