import PlayersList from './PlayersList';
import React from 'react';
import { shallow } from 'enzyme';
import Player from '../Player/Player';

it('renders without crashing', () => {
	shallow(<PlayersList players={[]} />);
});

it('renders correct number of players', () => {
	const players = [
		{
			name: 'Kunegunda',
			score: 5
		},
		{
			name: 'Antoś',
			score: 0
		}
	]
	const playerComponent = shallow(<PlayersList players={players} />);
	//console.log(playerComponent.debug());
	const expectedPlayersNumber = playerComponent.find(Player).length;
	expect(expectedPlayersNumber).toEqual(2);
	
});

it('correctly invokes onScoreUpdate()', () => {
	const players = [
		{
			name: 'Kunegunda',
			score: 5
		},
		{
			name: 'Antoś',
			score: 0
		}
	]
	const mockedOnScoreUpdate = jest.fn();
	const playerComponent = shallow(<PlayersList players={players} onScoreUpdate={mockedOnScoreUpdate} />);
	const firstPlayer = playerComponent.find(Player).first();
	const onPlayerScoreChange = firstPlayer.prop('onPlayerScoreChange');
	onPlayerScoreChange(10);
	expect(mockedOnScoreUpdate).toBeCalledWith(0, 10);
});

it('correctly invokes onPlayerRemove()', () => {
	const players = [
		{
			name: 'Kunegunda',
			score: 5
		},
		{
			name: 'Antoś',
			score: 0
		}
	]
	const mockedOnPlayerRemove = jest.fn();
	const playerComponent = shallow(<PlayersList players={players} onPlayerRemove={mockedOnPlayerRemove} />);
	const firstPlayer = playerComponent.find(Player).first();
	const onPlayerRemove = firstPlayer.prop('onPlayerRemove');
	onPlayerRemove();
	expect(mockedOnPlayerRemove).toBeCalled();
});
