import moment from 'moment';

export const formatDate = (dateString: string) => {
    return moment(dateString).format('MMM DD, YYYY HH:mm:ss');
};