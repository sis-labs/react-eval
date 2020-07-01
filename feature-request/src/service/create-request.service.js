
import * as uuid from 'uuid';
import * as moment from 'moment';

export function createRequest(title, content, email, tags = [], votes = [], comments = []) {
    const id = uuid.v4();
    const version = uuid.v4();
    const createdAt = moment().unix();
    return {
        id,
        version,
        createdAt,
        lastUpdatedAt: createdAt,
        title,
        content,
        email,
        tags,
        votes,
        comments,
    };
}
