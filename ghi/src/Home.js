import React from 'react';

function Home() {

    return (
        <div style={{ 
            display: 'flex',
            justifyContent: 'center', 
            alignItems: 'center', 
            flexWrap: 'wrap', 
            // marginTop: '5%',
        }}>
            <h1 style={{
                textAlign: 'center',
                flexBasis: '100%',
                fontSize: '70px',
        }}
        >Dedication to Education</h1>
            <button style={{ 
                fontSize: '230px', 
                backgroundColor: 'grey', 
                padding: '250px 120px', 
                transition: 'transform 0.3s',
                position: 'relative',
                zIndex: 1,
                paddingLeft: '120px',
                flexBasis: '40%',
                border: '2px solid red',
                fontFamily: 'Breaking Italic C',
                backgroundImage: 'url(/garen.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                color: 'red'
            }} 
            onMouseEnter={(e) => {
                e.target.style.transform = 'scale(1.06)';
                e.target.style.zIndex = 2;
            }}
            onMouseLeave={(e) => {
                e.target.style.transform = 'scale(1)';
                e.target.style.zIndex = 1;
            }}>
                Boosting
            </button>
            <button style={{ 
                fontSize: '230px', 
                backgroundColor: 'grey', 
                padding: '250px 120px', 
                transition: 'transform 0.3s',
                position: 'relative',
                zIndex: 1,
                flexBasis: '40%',
                border: '2px solid red',
                fontFamily: 'Breaking Italic C',
                backgroundImage: 'url(/katarina.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                color: 'red'
            }} 
            onMouseEnter={(e) => {
                e.target.style.transform = 'scale(1.06)';
                e.target.style.zIndex = 2;
            }}
            onMouseLeave={(e) => {
                e.target.style.transform = 'scale(1)';
                e.target.style.zIndex = 1;
            }}>
                Coaching
            </button>
            <button style={{ 
                fontSize: '60px', 
                backgroundColor: 'grey', 
                padding: '40px 80px', 
                transition: 'transform 0.3s',
                position: 'relative',
                zIndex: 1,
                flexBasis: '96.9%',
                border: '2px solid red',
                fontFamily: 'Breaking Italic C'
            }} 
            onMouseEnter={(e) => {
                e.target.style.transform = 'scale(1.03)';
                e.target.style.zIndex = 2;
            }}
            onMouseLeave={(e) => {
                e.target.style.transform = 'scale(1)';
                e.target.style.zIndex = 1;
            }}>
                Purchase a Duo Partner
                <p style={{fontFamily:'Oxygen', fontSize:'20px'}}>we match you with an elo booster to play at your elo</p>
            </button>
        </div>
    );
} 

export default Home;
