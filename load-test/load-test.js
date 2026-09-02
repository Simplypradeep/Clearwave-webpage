import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    vus: 30,
    duration: '30s',
};

export default function () {

    const baseUrl = 'http://54.158.25.203';

    const responses = http.batch([
        ['GET', `${baseUrl}/`],
        ['GET', `${baseUrl}/clearwave.css`],
        ['GET', `${baseUrl}/clearwave.js`],
        ['GET', `${baseUrl}/images/phone-shell.jpg`],
        ['GET', `${baseUrl}/images/screen2.jpg`],
        ['GET', `${baseUrl}/images/screen3.jpg`],
        ['GET', `${baseUrl}/images/screen4.jpg`],
        ['GET', `${baseUrl}/images/screen5.jpg`],
    ]);

    check(responses[0], {
        'HTML loaded': (r) => r.status === 200,
    });

    check(responses[1], {
        'CSS loaded': (r) => r.status === 200,
    });

    check(responses[2], {
        'JavaScript loaded': (r) => r.status === 200,
    });

    sleep(1);
}