import React from 'react'

const ImagePopup = ({ imageUrl, onClick }: any) => {
    return (
        <>
            <div className='Overlay' onClick={onClick} />
            <div className='Popup' onClick={onClick}>
                <img src={imageUrl} alt='' className='my-project-item' />
            </div>
        </>
    )
}

export default ImagePopup
