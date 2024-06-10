// jest.setup.ts

// next/navigation 모듈에 대한 공통 mock 설정
jest.mock('next/navigation', () => ({
  useRouter: jest.fn()
}));