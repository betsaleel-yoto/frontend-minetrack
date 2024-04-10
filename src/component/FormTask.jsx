import React, { useState, useEffect } from "react";

function FormTask(props) {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    const storedChecked = localStorage.getItem(`task_${props.taskId}`);
    if (storedChecked !== null) {
      setIsChecked(storedChecked === 'true');
    }
  }, [props.taskId]);

  const handleCheckboxChange = (event) => {
    const updatedChecked = event.target.checked;
    setIsChecked(updatedChecked);
    props.onChange(event, props.taskId); // Appel de la fonction de gestion de la case à cocher du composant parent
    // Enregistrer l'état de la case cochée dans le stockage local
    localStorage.setItem(`task_${props.taskId}`, updatedChecked);
  };

  return (
    <>
      <form action="" method="POST" className="pt-4 pl-5">
        <input
          type="checkbox"
          name="taskFinished"
          checked={isChecked}
          className="font-semibold font-raleway"
          onChange={handleCheckboxChange}
        />{" "}
        <label
          htmlFor="checkbox"
          className="text-[#808080]  font-raleway font-semibold"
        >
          {props.text}
        </label>
      </form>
    </>
  );
}

export default FormTask;
