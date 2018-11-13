const request = require('superagent');

module.exports = async function (context, timer) {
    var timeStamp = new Date().toISOString();

    if (timer.isPastDue) {
        context.log('JavaScript is running late!');
    }
    context.log('JavaScript timer trigger function ran!', timeStamp);

    const response = await request.get('https://api.github.com/events');

    const messages = response.filter(event => {
        return event.type === 'IssuesEvent' || event.type === 'PullRequestEvent'
    }).map(event => {
        const title = event.payload.pull_request && event.payload.pull_request.title ||
            event.payload.issue && event.payload.issue.title;

        const type = event.type === 'IssuesEvent' ? 'Nowe issue' : 'Nowy pull request';

        return `${type}: Użytkownik '${event.actor.login}', repo '${event.repo.name}', title '${title}' `;
    });

    return messages;
};