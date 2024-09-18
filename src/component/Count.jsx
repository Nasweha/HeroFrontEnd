import React from 'react';

function Count({ total,New, solved, inProgress }) {
    return (
        <div className='container mt-5'>
            <div className='row'>
                <div className='col-md-3'>
                    <div className='p-3  text-white text-center'style={{backgroundColor:"#2587cb"}}>
                        <h5>Total Grievances: {total}</h5>
                    </div>
                </div>
                <div className='col-md-3'>
                    <div className='p-3  text-white text-center'style={{backgroundColor:"#2587cb"}}>
                        <h5>New : {New}</h5>
                    </div>
                </div>
                <div className='col-md-3'>
                    <div className='p-3 text-white text-center' style={{backgroundColor:"#2587cb"}}>
                        <h5>Resolved : {solved}</h5>
                    </div>
                </div>
                <div className='col-md-3'>
                    <div className='p-3  text-white text-center' style={{backgroundColor:"#2587cb"}}>
                        <h5>In Progress : {inProgress}</h5>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Count;
