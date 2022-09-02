
import MainNavigation from './Navigation/MainNavigation';
import Footer from './Footer';
const Layout:React.FC=({children})=>{
  return(
    <>
    {/* <Header /> */}
    <MainNavigation />
      <main>
        {children}
      </main>
    <Footer />
  </>
  )
}

export default Layout;