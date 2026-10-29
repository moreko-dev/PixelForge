import CreateProjectModal from "@src/features/shared/CreateProjectModal.js";
import { useState } from "react";
import { LuPlus } from "react-icons/lu";
import ActionCard from "./ActionCard.js";

function CreateProjectActionCard() {
  const [modalShow, setModalShow] = useState<boolean>(false);
  return (
    <>
      <ActionCard
        title="Create new"
        desc="Start with a blank canvas."
        Icon={LuPlus}
        mode="error"
        onActionClick={() => setModalShow(true)}
      />
      {modalShow && <CreateProjectModal onClose={() => setModalShow(false)} />}
    </>
  );
}

export default CreateProjectActionCard;
