export default function Modal({ open, onClose, children }) {
  if (!open) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-md flex items-center justify-center p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-2xl
                   p-6 rounded-2xl max-h-[85vh] overflow-y-auto w-full max-w-2xl"
      >
        {children}
      </div>
    </div>
  );
}
