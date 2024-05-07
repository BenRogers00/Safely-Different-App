import ExpertCards from "./ExpertCards"

function ExpertCardsList(){
    
    return(
        <>
        <div className="flex flex-wrap justify-center text-center mt-[70px]" >
         <ExpertCards images ="images/testimonials_1.png" name="David Beckam" description =" One of our bla labla lblablas b One of our bla labla lblablas b One of our bla labla lblablas b"/>
         <ExpertCards images ="images/testimonials_1.png" name="David Beckam" description ="One of our bla labla lblablas blabla"/>
         

        </div>
        
        </>
    )
}

export default ExpertCardsList