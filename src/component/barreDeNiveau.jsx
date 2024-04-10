function BarreDeNiveau(props) {
  const classNames=`rounded-xl ${props.width} ${props.bgcl} ${props.h}`
  return ( 
    <>
    <div className={classNames}>

    </div>
    </>
   );
}

export default BarreDeNiveau;

// on va récupérer le pourcentage le diviser par 10 et l'appliquer au width et on va aussi mettre un UseState pour la couleur et poser des conditions par rapport a cela