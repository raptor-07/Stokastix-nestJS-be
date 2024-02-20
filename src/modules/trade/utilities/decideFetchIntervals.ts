import { FetchIntervalState } from '../dto/trade.fetchIntervalStateDto';
import { ConfigDto } from '../dto/trade.configDto';

function decideFetchIntervals(
  userData: ConfigDto,
  fetchIntervalState: FetchIntervalState,
): FetchIntervalState {
  if (userData.entryTf === '15m' || userData.exitTf === '15m') {
    fetchIntervalState._15m = true;
  }
  if (userData.entryTf === '30m' || userData.exitTf === '30m') {
    fetchIntervalState._30m = true;
  }
  if (userData.entryTf === '1h' || userData.exitTf === '1h') {
    fetchIntervalState._1h = true;
  }

  switch (userData.trendTf) {
    case '4h':
      fetchIntervalState._4h = true;
      break;
    case '8h':
      fetchIntervalState._8h = true;
      break;
    case '1d':
      fetchIntervalState._1d = true;
      break;
  }
  return fetchIntervalState;
}

export { decideFetchIntervals };
