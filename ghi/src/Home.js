import React, { useState } from 'react';

function Home() {

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', marginTop: '20%'}}>
            <button style={{ 
                fontSize: '80px', 
                backgroundColor: 'grey', 
                padding: '60px 120px', 
                transition: 'transform 0.3s',
                position: 'relative',
                zIndex: 1,
                paddingLeft: '120px',
                flexBasis: '40%',
                border: '2px solid red' // Add red border
            }} 
            onMouseEnter={(e) => {
                e.target.style.transform = 'scale(1.3)';
                e.target.style.zIndex = 2;
            }}
            onMouseLeave={(e) => {
                e.target.style.transform = 'scale(1)';
                e.target.style.zIndex = 1;
            }}>
                Get Boosted
            </button>
            <button style={{ 
                fontSize: '80px', 
                backgroundColor: 'grey', 
                padding: '60px 120px', 
                transition: 'transform 0.3s',
                position: 'relative',
                zIndex: 1,
                flexBasis: '40%',
                border: '2px solid red' // Add red border
            }} 
            onMouseEnter={(e) => {
                e.target.style.transform = 'scale(1.3)';
                e.target.style.zIndex = 2;
            }}
            onMouseLeave={(e) => {
                e.target.style.transform = 'scale(1)';
                e.target.style.zIndex = 1;
            }}>
                Get Coaching
            </button>
            <button style={{ 
                fontSize: '40px', 
                backgroundColor: 'grey', 
                padding: '40px 80px', 
                transition: 'transform 0.3s',
                position: 'relative',
                zIndex: 1,
                flexBasis: '80%',
                border: '2px solid red' // Add red border
            }} 
            onMouseEnter={(e) => {
                e.target.style.transform = 'scale(1.2)';
                e.target.style.zIndex = 2;
            }}
            onMouseLeave={(e) => {
                e.target.style.transform = 'scale(1)';
                e.target.style.zIndex = 1;
            }}>
                Duos for Hire
            </button>
        </div>
    );
} 

export default Home;
