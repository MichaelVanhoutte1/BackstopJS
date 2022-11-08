module.exports = async (page, scenario) => {
  const hoverSelector = scenario.hoverSelectors || scenario.hoverSelector;
  const clickSelector = scenario.clickSelectors || scenario.clickSelector;
  const keyPressSelector = scenario.keyPressSelectors || scenario.keyPressSelector;
  const scrollToSelector = scenario.scrollToSelector;
  const postInteractionWait = scenario.postInteractionWait; // selector [str] | ms [int]

  if (keyPressSelector) {
    for (const keyPressSelectorItem of [].concat(keyPressSelector)) {
      await page.waitForSelector(keyPressSelectorItem.selector);
      await page.type(keyPressSelectorItem.selector, keyPressSelectorItem.keyPress);
    }
  }

  if (hoverSelector) {
    for (const hoverSelectorIndex of [].concat(hoverSelector)) {
      await page.waitForSelector(hoverSelectorIndex);
      await page.evaluate(hoverSelectorIndex => {
				for (var element of document.querySelectorAll(hoverSelectorIndex)) {
					element.hover();
				}
			}, hoverSelectorIndex);
    }
  }

  if (clickSelector) {
    for (const clickSelectorIndex of [].concat(clickSelector)) {
      await page.waitFor(clickSelectorIndex);
      await page.evaluate(clickSelectorIndex => {
				for (var element of document.querySelectorAll(clickSelectorIndex)) {
					element.click();
				}
			}, clickSelectorIndex);
    }
  }

  if (postInteractionWait) {
    await page.waitForTimeout(postInteractionWait);
  }

  if (scrollToSelector) {
    await page.waitForSelector(scrollToSelector);
    await page.evaluate(scrollToSelector => {
      document.querySelector(scrollToSelector).scrollIntoView();
    }, scrollToSelector);
  }
};
