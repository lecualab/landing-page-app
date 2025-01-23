import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';

export async function getNativeElement(
  fixture: Parameters<typeof TestbedHarnessEnvironment.loader>[0],
  harness: Parameters<
    ReturnType<(typeof TestbedHarnessEnvironment)['loader']>['getHarness']
  >[0],
): Promise<Element> {
  const harnessLoader = TestbedHarnessEnvironment.loader(fixture);
  const componentHarness = await harnessLoader.getHarness(harness);
  const testElement = await componentHarness.host();

  return TestbedHarnessEnvironment.getNativeElement(testElement);
}
