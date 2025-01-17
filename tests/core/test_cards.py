from bson import ObjectId
from flask import json
from pytest import fixture


@fixture(autouse=True)
def init(app):
    app.data.insert('cards', [{
        '_id': ObjectId('59b4c5c61d41c8d736852fbf'),
        'label': 'Sport',
        'type': '6-text-only',
        'dashboard': 'newsroom',
        'config': {
            'product': '5a23c1131d41c82b8dd4267d',
            'size': 6,
        }
    }])


def test_card_list_fails_for_anonymous_user(client):
    with client.session_transaction() as session:
        session['user'] = None
    response = client.get('/cards')
    assert response.status_code == 302


def test_save_and_return_cards(client):
    # Save a new card
    client.post('/cards/new', data={'card': json.dumps({
        '_id': ObjectId('59b4c5c61d41c8d736852fbf'),
        'label': 'Local News',
        'type': '4-picture-text',
        'config': {
            'product': '5a23c1131d41c82b8dd4267d',
            'size': 4,
        }
    })})

    response = client.get('/cards')
    assert 'Local' in response.get_data(as_text=True)


def test_update_card(client):
    client.post('/cards/59b4c5c61d41c8d736852fbf/',
                data={'card': json.dumps({'label': 'Sport',
                                          'dashboard': 'newsroom',
                                          'type': '4-picture-text'})})

    response = client.get('/cards')
    assert '4-picture-text' in response.get_data(as_text=True)


def test_delete_card_succeeds(client):
    client.delete('/cards/59b4c5c61d41c8d736852fbf')

    response = client.get('/cards')
    data = json.loads(response.get_data())
    assert 0 == len(data)
