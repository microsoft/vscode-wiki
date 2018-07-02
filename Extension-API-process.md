Extension API Process
=

The goal of this process is to be transparent about how API is created, what phases a proposal goes through, and to know what proposals are finalised when. Still, we want to maintain flexibility in making API. 

Weekly API call: 
--

* During debt week, *everyone* that plans to work on API joins the call and presents their case. This call is about forming a shared understanding of the problem and helps us to understand whether the request is one that can safely be mapped onto prior art or will require custom constructs (which pretty much means more work).
* We introduce a ‘api-finalization’ tag on GH to clearly identify the items that are about moving API from proposed to stable.
* Everyone who owns an open ‘api-finalization’ item for the current iteration needs to show up for the API call.
* Everyone who owns an open ‘api-finalization’ item scheduled for the iteration will present in week 1 of the iteration a concrete proposal and sample code showing how the API is being used. The sample code needs to be realistic. One-liners with artificial parameters etc. usually don’t cut it.
* In each API call, we’ll work through the remaining open ‘api-finalization’ items before we look at ‘api-proposal’ items.
* If an API topic needs more time than what we have in the API call, we’ll schedule separate calls for these topics. These calls are open to everyone, just like the API call. 


Phases of a proposal
--

1. Idea -> _Ask yourself:_ How does this fit into the existing API? Is this a one-off-API that solves only your one problem? Does this reuse a concept, like providers or commands, or does this add a new concept? 
2. Proposal -> _Ask yourself:_ Does my proposal alter existing API and/or violates it our [API guidelines](https://github.com/Microsoft/vscode/wiki/Extension-API-guidelines)?
3. Finalization -> _ Ask yourself:_ Do I have a non-trivial usage-sample for this? Do we use this new API ourselves? 