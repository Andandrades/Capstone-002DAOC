import React from 'react';
import { renderToString } from 'react-dom/server';
import CancelAppointmentTemplate from '../assets/emailTemplates/CancelAppointmentTemplate';
import ConfirmAppointmentTemplate from '../assets/emailTemplates/ConfirmAppointmentTemplate';
import ChangePasswordTemplate from '../assets/emailTemplates/ChangePasswordTemplate';
import AccountDeletedTemplate from '../assets/emailTemplates/AccountDeletedTemplate';
import PaymentCancelledTemplate from '../assets/emailTemplates/PaymentCancelledTemplate';
import AccountCreatedTemplate from '../assets/emailTemplates/AccountCreatedTemplate';

const plantillasCorreos = (templateName, data) => {
  switch (templateName) {
    case 'cancelAppointment':
      return renderToString(<CancelAppointmentTemplate {...data} />);
    case 'confirmAppointment':
      return renderToString(<ConfirmAppointmentTemplate {...data} />);
    case 'changePassword':
      return renderToString(<ChangePasswordTemplate {...data} />);
    case 'accountDeleted':
      return renderToString(<AccountDeletedTemplate {...data} />);
    case 'paymentCancelled':
      return renderToString(<PaymentCancelledTemplate {...data} />);
    case 'accountCreated':
      return renderToString(<AccountCreatedTemplate {...data} />);
    default:
      return '';
  }
};

export default plantillasCorreos;