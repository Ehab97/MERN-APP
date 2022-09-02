const Footer:React.FC=()=>{
  return(
    <footer className="flex justify-center w-full bg-green-500 p-2 mt-4">
      <p>
        &copy; {new Date().getFullYear()}
      </p>

    </footer>
  )
}
export default Footer;