export default function Button({ children, ...others }) {
    console.log(others)
    return <button {...others}>{children}</button>;
  }