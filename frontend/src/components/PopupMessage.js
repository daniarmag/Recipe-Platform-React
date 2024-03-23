const PopupMessage = ({ isVisible, message, duration, onClose }) => {
  const MessageContainer = (
    <div
      className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 w-80 z-50 bg-green-300 rounded-md shadow-md p-4 ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <p className="text-center AssistantFont font-semibold">{message}</p>
    </div>
  );

  return isVisible ? MessageContainer : null;
};

export default PopupMessage;
