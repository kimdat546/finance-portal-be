export const errorTitle = {
  auth: 'Authentication',
  conflict: 'Update Conflict Detected',
  inviteFail: 'Failed to Send Invitation Email',
};

export const errorData = {
  accountNotFound: {
    title: errorTitle.auth,
    desc: ['Account not found. Please contact Casium administrator.'],
  },
  accountDeactivated: {
    title: errorTitle.auth,
    desc: [
      'Account has been deactivated. Please contact Casium administrator.',
    ],
  },
  credentialInvalid: {
    title: errorTitle.auth,
    desc: ['Invalid email or password. Please try again.'],
  },
  invalidForgotCode: {
    title: errorTitle.auth,
    desc: ['Invalid code, please try again.'],
  },
  forgotCodeExp: {
    title: errorTitle.auth,
    desc: ['The password reset code has expired. Please request a new code.'],
  },
  userNotExist: {
    title: errorTitle.auth,
    desc: ['User does not exist, please contact admin.'],
  },
  sessionExp: {
    title: errorTitle.auth,
    desc: ['Session has expired. Please try again.'],
  },
  taskNotFound: {
    title: '',
    desc: ['Task not found'],
  },
  attachmentNotFound: {
    title: '',
    desc: ['Attachment not found'],
  },
  conflictVersion: {
    title: errorTitle.conflict,
    desc: [
      'The content you are editing is not the latest version. You can close this pop-up to back up your edits. You can also reload the page to start editing the updated content but you will lose all your current progress',
    ],
    actions: ['reload_page'],
  },
  emailAlreadyInUse: {
    desc: ['This email is already in use.'],
  },
  emailAlreadyExist: {
    desc: ['Email has already exist.'],
  },
  pwIncorrect: {
    desc: ['Current password is incorrect.'],
  },
  invitation: {
    accountDeactivated: {
      title: errorTitle.inviteFail,
      desc: [
        'User account is currently deactivated. Please activate the account before sending the email invitation.',
      ],
    },
    commonFail: {
      title: 'Send Invitation',
      desc: ['Failed to send the invitation email. Please try again.'],
    },
  },
  comment: {
    taskNotFound: {
      title: 'Task Comment',
      desc: ['Task not found.'],
    },
    notOwned: {
      title: 'Task Comment',
      desc: ['Not owned by you.'],
    },
    notAllowAssignResolved: {
      title: 'Task Comment',
      desc: ['You can not assign on resolved comment'],
    },
  },
  task: {
    canNotAccess: {
      title: 'Unauthorized Access',
      desc: [
        'You do not have permission to access this task. Please check your credentials or contact Casium Admin for assistance.',
      ],
    },
    notFound: {
      title: 'Task',
      desc: ['Task not found.'],
    },
  },
  invoice: {
    existName: {
      title: 'Failed to generate payment link',
      desc: [
        'Invoice name already exists. Please enter a unique Invoice name.',
      ],
    },
    generateLinkError: {
      title: 'Failed to generate payment link',
      desc: ['Please try again later.'],
    },
    canNotUpdateReceiptForPaid: {
      title: 'Failed to update receipt manual',
      desc: ['You can not update for this status.'],
    },
    removeExistReceiptFirst: {
      title: 'Failed to update receipt manual',
      desc: ['Please remove exist receipt before update new receipt.'],
    },
  },
};
