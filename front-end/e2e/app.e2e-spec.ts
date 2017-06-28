import { CourseProjectSupportSidePage } from './app.po';

describe('course-project-support-side App', () => {
  let page: CourseProjectSupportSidePage;

  beforeEach(() => {
    page = new CourseProjectSupportSidePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
