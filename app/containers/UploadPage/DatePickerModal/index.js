import moment from 'moment';
import jMoment from 'moment-jalaali';
import React, { memo, useState } from 'react';
import JalaliUtils from '@date-io/jalaali';

import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  createMuiTheme,
} from '@material-ui/core';
import { compose } from 'redux';

import { ThemeProvider } from '@material-ui/styles';
import pink from '@material-ui/core/colors/pink';

const materialTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#df0f50',
    },
  },
  typography: {
    fontFamily: 'iranSans',
  },
  direction: 'rtl',
});

jMoment.loadPersian({ dialect: 'persian-modern', usePersianDigits: false });

function DatePickerModal({ open, onAccept, onClose }) {
  const [selectedDate, handleDateChange] = useState(moment());

  function handlePublishAt() {
    onAccept(selectedDate && selectedDate.format('YYYY-MM-DD HH:mm:00'));
    onClose();
  }
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        تاریخ انتشار ویدیو را انتخاب کنید
      </DialogTitle>
      <DialogContent>
        <MuiPickersUtilsProvider utils={JalaliUtils} locale="fa">
          <ThemeProvider theme={materialTheme}>
            <DateTimePicker
              dir="ltr"
              inputVariant="outlined"
              fullWidth
              size="small"
              clearable
              okLabel="تأیید"
              cancelLabel="لغو"
              clearLabel="پاک کردن"
              disablePast
              labelFunc={date =>
                date ? date.format('jYYYY/jMM/jDD HH:mm:00') : ''
              }
              value={selectedDate}
              onChange={handleDateChange}
            />
          </ThemeProvider>
        </MuiPickersUtilsProvider>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          انصراف
        </Button>
        <Button onClick={() => handlePublishAt()} color="primary" autoFocus>
          تایید
        </Button>
      </DialogActions>
    </Dialog>
  );
}
export default compose(memo)(DatePickerModal);
