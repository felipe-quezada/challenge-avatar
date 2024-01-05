import pika from '../assets/pikachu.gif';

export const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <img src={pika} alt="load Pikachu" />
    </div>
  );
};
