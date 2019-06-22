import { songSampleDataRaw } from './SampleData';

var currentIdx = songSampleDataRaw.items.length-1;

const songLogReducer = (tracks = [songSampleDataRaw.items[currentIdx]], action) => {
  switch (action.type) {
    case 'FETCH':
      if (currentIdx >= 0) {
        return [songSampleDataRaw.items[currentIdx--], ...tracks];
      } else {
        return tracks;
      }

    case 'UPVote':
      return tracks.map((item, index) => {
        if(index == action.payload){
          return {
            ...item,
            upAmount: item.upAmount + 1,
            voteState: 1
          }
        }
        return item;
      })

    case 'DOWNVote':
      return tracks.map((item, index) => {
        if(index == action.payload){
          return {
            ...item,
            downAmount: item.downAmount + 1,
            voteState: 2
          }
        }
      return item;
      })

    case 'UPComplete':
      return tracks.map((item, index) => {
        if(index == action.payload){
          return {
            ...item,
            upAmount: item.upAmount - 1,
            voteState: 0
          }
        }
      return item;
      })

    case 'DOWNComplete':
      return tracks.map((item, index) => {
        if(index == action.payload){
          return {
            ...item,
            downAmount: item.downAmount - 1,
            voteState: 0
          }
        }
      return item;
      })
  }
  return tracks;
};

export default songLogReducer;