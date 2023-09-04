import React from "react";
import { Modal, Button } from "semantic-ui-react";
import { useHistory } from "react-router-dom";

const PrivacyModal = () => {
  const history = useHistory();
  const handleClose = () => {
    history.push("/login");
  };
  const handleConfirm = () => {
    history.push("/conflict");
  };
  return (
    <Modal
      onClose={handleClose}
      onActionClick={handleConfirm}
      open={true}
      closeOnDocumentClick={false}
      closeOnDimmerClick={false}
    >
      <Modal.Header> Privacy Consent Statement </Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <p>
            By using our services, you acknowledge and consent to the
            collection, processing, and storage of your data within the secure
            confines of Humber College's data center. We are committed to
            safeguarding your personal information and ensuring its
            confidentiality. Rest assured that your data will not be shared,
            disclosed, or transmitted outside the institution, preserving your
            privacy and maintaining the integrity of your information within the
            Humber College ecosystem. Your trust is paramount to us, and we
            adhere to stringent data protection measures to uphold your privacy
            rights. If you have any questions or concerns about the handling of
            your data, please do not hesitate to reach out to our dedicated
            privacy team. By continuing to use our services, you signify your
            understanding of this consent and your agreement to the specified
            data storage and usage practices outlined above.
          </p>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={handleClose}>No</Button>
        <Button positive onClick={handleConfirm}>
          Yes
        </Button>
      </Modal.Actions>
    </Modal>
  );
};
export default PrivacyModal;
