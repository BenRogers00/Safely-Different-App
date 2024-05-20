export const RenderHeader = () => {

     return (
          <div className="header">
               <div className="logo">
                    <img onClick={ () => { window.location.href="/login"} } src="/logo.png" alt="login"/>
               </div>
               <h1>Safely-Different</h1>
          </div>
     )
}