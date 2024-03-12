import { setLoggers } from '../../common/loggers';
import { getMockedLoggers } from '../../tests/mocks';

describe('ArcSightPlatform background tests', () => {
  let platform: any;
  setLoggers(getMockedLoggers([]));

  const getGoldenResponse = () => {
    /* eslint-disable-next-line */
    return `//OK[1,["<label class=\\"hover-word hover-destinationAddress=12\\">0.0.0.1</label>","<label class=\\"hover-word hover-deviceVendor=14\\">ArcSight</label>","&nbsp;","<label class=\\"hover-word hover-deviceProduct=15\\">ArcSight</label>","1","<label class=\\"hover-word hover-Raw-Message=16\\" for=\\"CEF:0\\">CEF:0</label>|<label class=\\"hover-word hover-Raw-Message=17\\" for=\\"ArcSight\\">ArcSight</label>|<label class=\\"hover-word hover-Raw-Message=17\\" for=\\"ArcSight\\">ArcSight</label>|<label class=\\"hover-word hover-Raw-Message=18\\" for=\\"0.0.0.0.2\\">0.0.0.0.2</label>|<label class=\\"hover-word hover-Raw-Message=19\\" for=\\"test-agent-data\\">test-agent-data</label>|<label class=\\"hover-word hover-Raw-Message=20\\" for=\\"Discovered\\">Discovered</label> <label class=\\"hover-word hover-Raw-Message=21\\" for=\\"corrupted\\">corrupted</label> <label class=\\"hover-word hover-Raw-Message=22\\" for=\\"test\\">test</label> <label class=\\"hover-word hover-Raw-Message=23\\" for=\\"package:\\">package:</label> <label class=\\"hover-word hover-Raw-Message=24\\" for=\\"test-mappings.\\">test-mappings.</label> <label class=\\"hover-word hover-Raw-Message=25\\" for=\\"test\\">Some</label> <label class=\\"hover-word hover-Raw-Message=26\\" for=\\"retry\\">error</label> <label class=\\"hover-word hover-Raw-Message=27\\" for=\\"opening\\">message</label> <label class=\\"hover-word hover-Raw-Message=28\\" for=\\"package...\\">...</label>|<label class=\\"hover-word hover-Raw-Message=29\\" for=\\"High\\">High</label>| eventId=3<label class=\\"hover-word hover-Raw-Message=30\\" for=\\"4\\">4</label>36<label class=\\"hover-word hover-Raw-Message=31\\" for=\\"7\\">7</label><label class=\\"hover-word hover-Raw-Message=32\\" for=\\"0\\">0</label>22836 end=<label class=\\"hover-word hover-Raw-Message=33\\" for=\\"1\\">9199</label>1<label class=\\"hover-word hover-Raw-Message=31\\" for=\\"7\\">1</label>1<label class=\\"hover-word hover-Raw-Message=34\\" for=\\"10\\">1</label><label class=\\"hover-word hover-Raw-Message=31\\" for=\\"7\\">7</label><label class=\\"hover-word hover-Raw-Message=32\\" for=\\"0\\">0</label>3<label class=\\"hover-word hover-Raw-Message=32\\" for=\\"0\\">0</label> mrt=<label class=\\"hover-word hover-Raw-Message=33\\" for=\\"1\\">1</label>6<label class=\\"hover-word hover-Raw-Message=31\\" for=\\"7\\">7</label>595<label class=\\"hover-word hover-Raw-Message=34\\" for=\\"10\\">10</label><label class=\\"hover-word hover-Raw-Message=31\\" for=\\"7\\">7</label><label class=\\"hover-word hover-Raw-Message=32\\" for=\\"0\\">0</label>39<label class=\\"hover-word hover-Raw-Message=32\\" for=\\"0\\">0</label> cnt=<label class=\\"hover-word hover-Raw-Message=33\\" for=\\"1\\">1</label> dst=<label class=\\"hover-word hover-Raw-Message=35\\" for=\\"0.0.0.3\\">0.0.0.3</label> type=<label class=\\"hover-word hover-Raw-Message=32\\" for=\\"0\\">0</label> priority=<label class=\\"hover-word hover-Raw-Message=31\\" for=\\"7\\">7</label> start=<label class=\\"hover-word hover-Raw-Message=33\\" for=\\"1\\">1</label>6<label class=\\"hover-word hover-Raw-Message=31\\" for=\\"7\\">7</label>595<label class=\\"hover-word hover-Raw-Message=34\\" for=\\"10\\">10</label><label class=\\"hover-word hover-Raw-Message=31\\" for=\\"7\\">7</label><label class=\\"hover-word hover-Raw-Message=32\\" for=\\"0\\">0</label>39<label class=\\"hover-word hover-Raw-Message=32\\" for=\\"0\\">0</label> modelConfidence=<label class=\\"hover-word hover-Raw-Message=30\\" for=\\"4\\">4</label> severity=<label class=\\"hover-word hover-Raw-Message=32\\" for=\\"0\\">0</label> relevance=<label class=\\"hover-word hover-Raw-Message=34\\" for=\\"10\\">10</label> <label class=\\"hover-word hover-Raw-Message=36\\" for=\\"local\\">local</label>ity=<label class=\\"hover-word hover-Raw-Message=37\\" for=\\"Local\\">Local</label> assetCriticality=<label class=\\"hover-word hover-Raw-Message=32\\" for=\\"0\\">0</label> cat=<label class=\\"hover-word hover-Raw-Message=38\\" for=\\"/Agent/Update?Failure\\">/Agent/Update?Failure</label> deviceSeverity=<label class=\\"hover-word hover-Raw-Message=39\\" for=\\"Warning\\">Warning</label> rt=<label class=\\"hover-word hover-Raw-Message=33\\" for=\\"1\\">1</label>6<label class=\\"hover-word hover-Raw-Message=31\\" for=\\"7\\">7</label>595<label class=\\"hover-word hover-Raw-Message=34\\" for=\\"10\\">10</label><label class=\\"hover-word hover-Raw-Message=31\\" for=\\"7\\">7</label><label class=\\"hover-word hover-Raw-Message=32\\" for=\\"0\\">0</label>39<label class=\\"hover-word hover-Raw-Message=32\\" for=\\"0\\">0</label> fname=<label class=\\"hover-word hover-Raw-Message=40\\" for=\\"test-mappings\\">test-mappings</label> filePath=<label class=\\"hover-word hover-Raw-Message=41\\" for=\\"/arcsighttest-mappings\\">/arcsighttest-mappings</label> fsize=<label class=\\"hover-word hover-Raw-Message=32\\" for=\\"0\\">0</label> fileModificationTime=<label class=\\"hover-word hover-Raw-Message=42\\" for=\\"364295404000\\">364295404000</label> originator=<label class=\\"hover-word hover-Raw-Message=32\\" for=\\"0\\">0</label> dhost=<label class=\\"hover-word hover-Raw-Message=43\\" for=\\"srv-arcesm-001\\">srv-arcesm-001</label> destinationAssetId=<label class=\\"hover-word hover-Raw-Message=44\\" for=\\"1234567890=\\">1234567890=</label> dlat=<label class=\\"hover-word hover-Raw-Message=45\\" for=\\"0.0\\">0.0</label> dlong=<label class=\\"hover-word hover-Raw-Message=45\\" for=\\"0.0\\">0.0</label> categoryObject=<label class=\\"hover-word hover-Raw-Message=46\\" for=\\"/Host/Application\\">/Host/Application</label> categoryBehavior=<label class=\\"hover-word hover-Raw-Message=47\\" for=\\"/Modify/Configuration\\">/Modify/Configuration</label> categorySignificance=<label class=\\"hover-word hover-Raw-Message=48\\" for=\\"/Informational/Error\\">/Informational/Error</label> categoryOutcome=<label class=\\"hover-word hover-Raw-Message=49\\" for=\\"/Failure\\">/Failure</label> categoryDeviceGroup=<label class=\\"hover-word hover-Raw-Message=50\\" for=\\"/Application\\">/Application</label> aid=<label class=\\"hover-word hover-Raw-Message=51\\" for=\\"1234567890123=\\">1234567890123=</label> at=<label class=\\"hover-word hover-Raw-Message=52\\" for=\\"arcsight_security_manager\\">arcsight_security_manager</label> av=<label class=\\"hover-word hover-Raw-Message=18\\" for=\\"0.0.0.0.2\\">0.0.0.0.2</label> ahost=<label class=\\"hover-word hover-Raw-Message=43\\" for=\\"srv-arcesm-001\\">srv-arcesm-001</label> agt=<label class=\\"hover-word hover-Raw-Message=35\\" for=\\"0.0.0.3\\">0.0.0.3</label> agentZone=<label class=\\"hover-word hover-Raw-Message=53\\" for=\\"1111\\">1111</label> agentAssetId=<label class=\\"hover-word hover-Raw-Message=44\\" for=\\"1234567890=\\">1234567890=</label> dvchost=<label class=\\"hover-word hover-Raw-Message=43\\" for=\\"srv-arcesm-001\\">srv-arcesm-001</label> dvc=<label class=\\"hover-word hover-Raw-Message=35\\" for=\\"0.0.0.3\\">0.0.0.3</label> deviceZone=<label class=\\"hover-word hover-Raw-Message=53\\" for=\\"1111\\">1111</label> deviceAssetId=<label class=\\"hover-word hover-Raw-Message=44\\" for=\\"1234567890=\\">1234567890=</label> destinationZone=<label class=\\"hover-word hover-Raw-Message=53\\" for=\\"1111\\">1111</label> oaid=<label class=\\"hover-word hover-Raw-Message=51\\" for=\\"1234567890123=\\">1234567890123=</label> oat=<label class=\\"hover-word hover-Raw-Message=52\\" for=\\"arcsight_security_manager\\">arcsight_security_manager</label> oav=<label class=\\"hover-word hover-Raw-Message=18\\" for=\\"0.0.0.0.2\\">0.0.0.0.2</label> oahost=<label class=\\"hover-word hover-Raw-Message=43\\" for=\\"srv-arcesm-001\\">srv-arcesm-001</label> oagt=<label class=\\"hover-word hover-Raw-Message=35\\" for=\\"0.0.0.3\\">0.0.0.3</label> oagentZone=<label class=\\"hover-word hover-Raw-Message=53\\" for=\\"1111\\">1111</label> oagentAssetId=<label class=\\"hover-word hover-Raw-Message=44\\" for=\\"1234567890=\\">1234567890=</label> fDeviceVendor=<label class=\\"hover-word hover-Raw-Message=17\\" for=\\"ArcSight\\">ArcSight</label> fDeviceProduct=<label class=\\"hover-word hover-Raw-Message=17\\" for=\\"ArcSight\\">ArcSight</label> fDeviceVersion=<label class=\\"hover-word hover-Raw-Message=18\\" for=\\"0.0.0.0.2\\">0.0.0.0.2</label> fdvchost=<label class=\\"hover-word hover-Raw-Message=43\\" for=\\"srv-arcesm-001\\">srv-arcesm-001</label> fdvc=<label class=\\"hover-word hover-Raw-Message=35\\" for=\\"0.0.0.3\\">0.0.0.3</label> fdeviceZone=<label class=\\"hover-word hover-Raw-Message=53\\" for=\\"1111\\">1111</label> fdeviceAssetId=<label class=\\"hover-word hover-Raw-Message=44\\" for=\\"1234567890=\\">1234567890=</label>"],0,7]`;
  };

  class Platform extends require('./ArcSightPlatform').ArcSightPlatform {
    checkValue(value: string): boolean {
      return super.checkValue(value);
    }
  }

  beforeEach(() => {
    platform = new Platform();
  });

  test('checkValue test', () => {
    expect(platform.checkValue('-')).toEqual(false);
    expect(platform.checkValue('')).toEqual(false);
    expect(platform.checkValue(' ')).toEqual(true);
  });

  test('normalizeResponse test', () => {
    let result = Platform.normalizeResponse();
    expect(result).toEqual(null);

    result = Platform.normalizeResponse('');
    expect(result).toEqual(null);

    result = Platform.normalizeResponse(getGoldenResponse());
    expect(!!result).toEqual(true);
  });

  test('parseResponse and set watchers test', async () => {
    const tabInfo = {
      id: 1111101,
      origin: 'test-platform.com',
    };

    const watchers = {
      Account: ['endTime', 'name'],
    };

    platform.setWatchers(watchers, tabInfo);

    let result = await platform.parseResponse([], tabInfo);

    expect(JSON.stringify(result)).toEqual('{}');

    result = await platform.parseResponse(
      Platform.normalizeResponse(getGoldenResponse()),
      tabInfo,
    );

    expect(result.Account.name.size).toEqual(1);
    expect(result.Account.endTime.size).toEqual(1);

    expect(Array.from(result.Account.name)[0]).toEqual('Discovered corrupted test package: test-mappings. Some error message ...');
    expect(Array.from(result.Account.endTime)[0]).toEqual('1999/02/25 04:51:57 EET');
  });
});
