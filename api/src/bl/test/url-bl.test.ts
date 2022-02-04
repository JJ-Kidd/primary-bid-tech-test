import { ensureUniqueShort, createShortUrl } from "../url-bl";
import { getUrlByShort, insertUrl } from "../../repo/url-repo";
import { shortGen } from "../../util/short-gen";
import { WithId, Document, ObjectId } from "mongodb";

const mockGetUrlByShort = (getUrlByShort as jest.MockedFunction<typeof getUrlByShort>)
const mockShortGen = (shortGen as jest.MockedFunction<typeof shortGen>)
const mockInsertUrl = (insertUrl as jest.MockedFunction<typeof insertUrl>)

jest.mock("../../repo/url-repo", () => {
  return {
    getUrlByShort: jest.fn(),
    insertUrl: jest.fn()
  }
})

jest.mock("../../util/short-gen", () => {
  return {
    shortGen: jest.fn()
  }
});

test("ensureUniqueShort iterates when short exists in database", async () => {
  mockGetUrlByShort
      .mockImplementationOnce(async (): Promise<WithId<Document>> => 
        ({ "_id": new ObjectId("61f719755d4e151c3d5d79e6"), long_url: 'www.google.com', short_url: '1gh5s8d3' }))
      .mockImplementationOnce(() => null)

  mockShortGen.mockImplementationOnce(() => "1gh5s8d3").mockImplementationOnce(() => "43dfa25f");

  expect(await ensureUniqueShort()).toBe("43dfa25f")
})

test("createShortUrl success", async () => {
  mockGetUrlByShort
    .mockImplementationOnce(() => null)
  mockShortGen.mockImplementationOnce(() => "43dfa25f");
  mockInsertUrl.mockImplementation(async() => true);
  const createShortRes = await createShortUrl("https://google.com")

  expect(mockInsertUrl).toHaveBeenCalledWith({short_url: "43dfa25f", long_url: "https://google.com"})
  expect(createShortRes).toMatchObject({ success: true, short_url: "43dfa25f"})
})


test("createShortUrl failure", async () => {
  mockGetUrlByShort
    .mockImplementationOnce(() => null)
  mockShortGen.mockImplementationOnce(() => "43dfa25f");
  mockInsertUrl.mockImplementation(async() => false);
  const createShortRes = await createShortUrl("https://google.com")

  expect(mockInsertUrl).toHaveBeenCalledWith({short_url: "43dfa25f", long_url: "https://google.com"})
  expect(createShortRes).toMatchObject({ success: false })
})

