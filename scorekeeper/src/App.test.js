import React from 'react';
import { shallow , mount } from 'enzyme';
import App from './App';
import PlayersList from './components/PlayersList/PlayersList';
import AddPlayer from './components/AddPlayer/AddPlayer';
import Player from './components/Player/Player';

it('renders without crashing', () => {
	shallow(<App />);
});

it('should update player score', () => {
	const appComponent = shallow(<App />);
	const players = [
		{
			name: 'Kunegunda',
			score: 5,
		},
		{
			name: 'Antoś',
			score: 0,
		}
	];
	appComponent.setState({ players });
	const onScoreUpdate = appComponent.find(PlayersList).prop('onScoreUpdate');
	onScoreUpdate(0, 5);

	const playersAfterUpdate = appComponent.state('players');
	expect(playersAfterUpdate[0].score).toEqual(10);
});

it('should correctly add player', () => {
	const appComponent = shallow(<App />);
	const onPlayerAdd = appComponent.find(AddPlayer).prop('onPlayerAdd');
	onPlayerAdd('Ania');
	const players = appComponent.state('players');

	expect(players.length).toEqual(1);
	expect(players[0].name).toEqual('Ania');
	expect(players[0].score).toEqual(0);
});

it('should correctly remove player', () => {
	const appComponent = mount(<App />);
	const players = [
		{
			name: 'Kunegunda',
			score: 5,
		},
		{
			name: 'Antoś',
			score: 0,
		}
	];
	appComponent.setState({ players });
	const onPlayerRemove = appComponent.find(Player).first().prop('onPlayerRemove');
	console.log(players);
	onPlayerRemove();


	expect(players.length).toEqual(1);
	expect(players[0].name).toEqual('Antoś');
	expect(players[0].score).toEqual(0);
});
