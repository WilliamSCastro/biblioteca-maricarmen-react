export default function ItemBestBook({ children, onClick }) {
    return (
      <div
        onClick={onClick}
        className="fiveItem"
      >
        {children}
      </div>
    );
  }