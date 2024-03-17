const ConfirmationDialog = ({ isVisible, onConfirm, onCancel }) => {
  return (
    isVisible && (
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
        <div className="bg-white p-4 rounded-md shadow-md">
          <p>Are you sure you want to delete this item?</p>
          <div className="flex justify-end mt-4">
            <button onClick={onCancel} className="bg-gray-300 px-3 py-1 rounded-md mr-2">Cancel</button>
            <button onClick={onConfirm} className="bg-red-500 text-white px-3 py-1 rounded-md">Delete</button>
          </div>
        </div>
      </div>
    )
  );
};

  export default ConfirmationDialog;