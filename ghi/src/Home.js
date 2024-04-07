import React from 'react';

function Home() {

    return (
        <div style={{ 
            display: 'flex',
            justifyContent: 'center', 
            alignItems: 'center', 
            flexWrap: 'wrap', 
            marginTop: '5%',
            marginLeft: '2%',
            marginRight: '2%',
        }}>
            <h1 style={{
                textAlign: 'center',
                flexBasis: '100%',
                fontSize: '70px',
                fontFamily: 'Courier New',
        }}
        >Discover a service that suits you</h1>
            <button style={{ 
                fontSize: '230px', 
                backgroundColor: 'grey', 
                padding: '250px 80px', 
                transition: 'transform 0.3s',
                position: 'relative',
                zIndex: 1,
                paddingLeft: '120px',
                border: '2px solid red',
                fontFamily: 'Breaking Italic C',
                backgroundImage: 'url(/garen.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                color: 'red',
                flex: '1',
                // flexBasis: '40%',
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
                <p style={{fontFamily:'Courier New', fontSize:'40px'}}>get a little nudge</p>
            </button>
            <button style={{ 
                fontSize: '230px', 
                backgroundColor: 'grey', 
                padding: '250px 80px', 
                transition: 'transform 0.3s',
                position: 'relative',
                zIndex: 1,
                border: '2px solid red',
                fontFamily: 'Breaking Italic C',
                backgroundImage: 'url(/katarina.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                color: 'red',
                flex: '1',
                // flexBasis: '40%',


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
                <p style={{fontFamily:'Courier New', fontSize:'40px'}}>match with a mentor</p>
            </button>
            <button style={{ 
                fontSize: '60px', 
                backgroundColor: 'grey', 
                padding: '40px 80px', 
                transition: 'transform 0.3s',
                position: 'relative',
                zIndex: 1,
                flexBasis: '90%',
                flex: '1',
                border: '2px solid red',
                fontFamily: 'Breaking Italic C',
                marginBottom: '3%',
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
                <p style={{fontFamily:'Courier New', fontSize:'20px'}}>we match you with an elo booster to play at your elo</p>
            </button>
        </div>
    );
} 

export default Home;
