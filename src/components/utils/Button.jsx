export default function Button({ children, ...others }) {
    return <button {...others}>{children}</button>;
  }