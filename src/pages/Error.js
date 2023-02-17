import Hourglass from '../assets/Hourglass.png'

function Error() {
    return (
        <div className="h-screen">
            <h1 className="text-center text-3xl pt-40">Oops!  Looks like something went wrong.  Please try again.</h1>
            <img src={Hourglass} alt="hourglass" className='m-auto pt-10'/>
        </div>
    );
}

export default Error;